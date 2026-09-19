const e=`## Find an exact declaration

Search below for a class, method, or global helper. Expand a file, then a method to see its signature, source documentation, and implementation link. The reference is generated from the framework source without executing it.

This snapshot includes public declarations and the protected testing/model extension points intended for subclasses. Trait methods appear under their declaring trait, and interfaces appear separately from implementations. Search \`BuildsReadQueries\` or \`BuildsConditionalClauses\` for query methods supplied by traits.

## Reading the reference

A declaration shows the exact parameter order, defaults, visibility, and return type in the source snapshot. Source docblocks provide additional context but can contain historical wording; the implementation and current guide take precedence where they disagree.

Dynamic methods supplied by \`__call\`, facades, macros, or application extensions do not necessarily have their own concrete declaration here. Look up the underlying service/trait. Protected methods are for subclass implementations, not direct calls from controllers.

## Keep it current

Maintainers can regenerate the current snapshot with \`npm run docs:sync-api\` and detect framework source changes with \`npm run docs:check-source\`. These commands are part of the documentation project, not the PHP application's Spark CLI.

When publishing a framework version, freeze the Markdown, navigation, and reference together. See [Maintaining documentation](./contributing.md#edit-content-and-navigation) for editing, checks, and version snapshots.
`;export{e as default};
