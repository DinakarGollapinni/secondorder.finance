import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const components = {
  h2: (props: any) => {
    const text = React.Children.toArray(props.children).join("");
    const id = slugify(text);
    return <h2 id={id} {...props} />;
  },
  h3: (props: any) => {
    const text = React.Children.toArray(props.children).join("");
    const id = slugify(text);
    return <h3 id={id} {...props} />;
  },
};

export default function MDXRenderer({
  source,
}: {
  source: string;
}) {
  return <MDXRemote source={source} components={components} />;
}
