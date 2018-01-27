# cg-breadcrumbs component

Provides breadcrumb navigation.

## Usage

Use with a `wsk-crumb` element for each link in the navigation.

```html
<cg-breadcrumbs>
    <wsk-crumb target="team.list" title="{{ 'page.team.title' | filter }}"></wsk-crumb>
    <wsk-crumb title="{{ $ctrl.employee.name }}"></wsk-crumb>
</cg-breadcrumbs>
```

## API

* wsk-crumb {transclusion}: A single crumb. 
    * title {string}: The title of the crumb.
    * target {string}: Passed to ui-sref to set the target state on a click event. (Optional)
