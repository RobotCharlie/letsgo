# wsk-crumb component

A single crumb in a breadcrumb navigation element.

## Usage

```html
<wsk-crumb title="{{ 'page.team.title' | filter}}" target="team.list"></wsk-crumb>
<wsk-crumb title="{{ 'page.team.title' | filter}}"></wsk-crumb>
```

## API

* title {string}: The title of the crumb.
* target {string}: Passed to ui-sref to set target state when clicked. (Optional)
