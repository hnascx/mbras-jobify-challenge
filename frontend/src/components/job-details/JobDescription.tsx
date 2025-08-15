interface JobDescriptionProps {
  description: string
}

export function JobDescription({ description }: JobDescriptionProps) {
  return (
    <div className="flex-1 py-8">
      <div className="max-w-3xl">
        <div
          className="prose prose-lg dark:prose-invert 
            prose-p:text-foreground prose-p:!text-inherit
            prose-li:text-foreground prose-li:!text-inherit
            prose-strong:text-foreground prose-strong:!text-inherit
            prose-em:text-foreground prose-em:!text-inherit
            prose-headings:text-foreground prose-headings:!text-inherit
            prose-a:text-foreground prose-a:!text-inherit
            prose-code:text-foreground prose-code:!text-inherit
            prose-pre:text-foreground prose-pre:!text-inherit
            prose-blockquote:text-foreground prose-blockquote:!text-inherit
            prose-figure:text-foreground prose-figure:!text-inherit
            prose-figcaption:text-foreground prose-figcaption:!text-inherit
            prose-table:text-foreground prose-table:!text-inherit
            prose-th:text-foreground prose-th:!text-inherit
            prose-td:text-foreground prose-td:!text-inherit
            [&_*]:!text-inherit [&_*]:!important
            [&_span]:!text-inherit [&_div]:!text-inherit
            [&_*]:![background-color:transparent]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  )
}
