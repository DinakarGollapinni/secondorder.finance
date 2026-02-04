import { NextResponse } from 'next/server';
import { getMarketSignal } from '@/lib/market-data';

export const revalidate = 21600; // 6 hours

export async function GET() {
    const data = await getMarketSignal();
    return NextResponse.json(data || { error: 'Failed to fetch signal data' });
}
