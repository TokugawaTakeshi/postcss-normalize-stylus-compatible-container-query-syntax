# PostCSS Normalize Stylus Compatible Container Query Syntax Plugin

Replaces the following patterns including the fictive `container` media type to regular container queries.

<dl>

  <dt>Singular condition</dt>
  <dd><code>@media container and (/* ... */)</code></dd>

  <dt>OR condition</dt>
  <dd><code>@media container (/* ... */), container and (/* ... */)</code></dd>

</dl>

There is no `container` media type, but it is the workaround for Stylus pre-processor which
  currently [does not support the container queries](https://github.com/stylus/stylus/discussions/2727).


## Installation

```bash
npm install postcss postcss-normalize-stylus-compatible-container-query-syntax
```

## Examples
### Simple Case

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

### OR Condition

Sometimes you may need to express an OR relationship between container conditions while staying Stylus-compatible. If you write a comma-separated media query that repeats the `container` "type" and uses `and` for the second part, the plugin will convert it into a single `@container` rule joined with `or`.

```css
/* Stylus-compatible workaround producing an OR between two container queries */
@media container (max-width: 99.98px), container and (max-height: 99.98px) {
  .box { color: green; }
}
```

Will be transformed to:

```css
@container (max-width: 99.98px) or (max-height: 99.98px) {
  .box { color: green; }
}
```

