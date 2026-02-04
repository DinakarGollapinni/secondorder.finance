import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

export async function POST(req: Request) {
    try {
        const { email, interest, honeypot, source, page_path } = await req.json();

        // 1. Spam control: honeypot
        if (honeypot) {
            // Silently ignore bots
            return NextResponse.json({ message: "Success" });
        }

        // Basic validation
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
        }

        // 2. Security Check: Configuration
        if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
            console.error('Google Sheets environment variables are missing');
            return NextResponse.json({ error: "Storage system is not configured" }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: SERVICE_ACCOUNT_EMAIL,
                private_key: PRIVATE_KEY,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 3. Deduplication: Check if email already exists
        // We fetch only the first column (Email) to save bandwidth
        const getResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:A',
        });

        const rows = getResponse.data.values || [];
        const emailExists = rows.some((row) => row[0]?.toLowerCase() === email.toLowerCase());

        if (emailExists) {
            return NextResponse.json({ message: "Already on the list" }, { status: 409 });
        }

        // 4. Metadata & Storage
        const values = [
            [
                email,
                interest || '',
                new Date().toISOString(),
                source || 'direct',
                page_path || '/pro',
            ],
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:E',
            valueInputOption: 'USER_ENTERED',
            requestBody: { values },
        });

        return NextResponse.json({ message: "Success" });
    } catch (error: any) {
        console.error('Error in early-access API:', error);

        // Fallback for quota issues or service account problems
        const errorMessage = error.code === 403
            ? "Permission denied. Check if sheet is shared with the service account."
            : (error.message || "Failed to save request");

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
