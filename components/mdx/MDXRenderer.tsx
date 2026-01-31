"use client";

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

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
  mdxSource,
}: {
  mdxSource: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...mdxSource} components={components} />;
}
