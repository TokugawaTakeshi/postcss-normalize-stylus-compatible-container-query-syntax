# PostCSS Normalize Stylus Compatible Container Query Syntax Plugin

In essence, replaces `@media container and` substrings with `@container` in CSS code.
There is no `container` media type, but it is the workaround for Stylus pre-processor which
  currently [does not support the container queries](https://github.com/stylus/stylus/discussions/2727).


## Installation

```bash
npm install postcss postcss-normalize-stylus-compatable-container-query-syntax
```

## Example

```css
/* Stylus-compatible workaround */
@media container and (min-width: 600px) {
  .a { display: grid; }
}

.card { padding: 1rem; }

@media container and (min-width: 30rem) {
  .b { color: rebeccapurple; }
}
```

Will be transformed to:

```css
@container (min-width: 600px) {
  .a { display: grid; }
}

.card { padding: 1rem; }

@container (min-width: 30rem) {
  .b { color: rebeccapurple; }
}
```
