# Multi-select Widget

Transforms a form select with the 'multiple' attribute into a friendly multi-select.

## Usage

After [downloading](https://github.com/torresleonel/multi-select-widget/archive/refs/heads/master.zip) the widget, add it to your HTML file:

```html
<script type="text/javascript" src="/path/to/multiselect_widget.js"></script>
```

You must define a `select` element with the `multiselect-widget` class and the `multiple` property:

```html
<select
    name="field[]"
    class="multiselect-widget"
    multiple
>
    <option value="1">First</option>
    <option value="2">Second</option>
    <option value="3">Third</option>
    <option value="4">Fourth</option>
</select>
```

You can define the message to show when there are no more options to choose from, using the attribute `data-no-options-msg`:

```html
<select
    name="field[]"
    class="multiselect-widget"
    multiple
    data-no-options-msg="Oh, no options!"
>
    <option value="1">First</option>
    <option value="2">Second</option>
    <option value="3">Third</option>
    <option value="4">Fourth</option>
</select>
```

This way you have your friendly multiple-select widget ready.

## Styling
You can also define the style using the following properties. They will receive a string of the classes to be applied to the DOM elements they represent:

- `data-select-container-class`: The `div` container of the widget.
- `data-select-box-class`: The container `div` of the chosen options.
- `data-select-list-class`: The `div` container of the options to choose.
- `data-select-item-class`: Element `a` representing the option to be selected.
- `data-tag-class`: The `div` that represents, in the form of a tag, the chosen option.
- `data-tag-icon-class`: The `span` representing the close button of the tag.

***Widget HTML***

```html
<!-- data-select-container-class -->
<div>
    <!-- data-select-box-class -->
    <div>
        <div>
            <!-- data-tag-class -->
            <div>
                <span>First</span>
                <!-- data-tag-icon-class -->
                <span>x</span>
            </div>
            <!-- data-tag-class -->
            <div>
                <span>Second</span>
                <!-- data-tag-icon-class -->
                <span>x</span>
            </div>
        </div>
    </div>
    <!-- data-select-list-class -->
    <div>
        <!-- data-select-item-class -->
        <a href="" selected>First</a>
        <!-- data-select-item-class -->
        <a href="" selected>Second</a>
        <!-- data-select-item-class -->
        <a href="">Third</a>
    </div>
</div>
```

***Example implementation using Bootstrap and Fontawesome***

```html
<select
    name="field[]"
    class="multiselect-widget"
    multiple
    data-no-options-msg="Oh, no options!"
    data-select-container-class="dropdown"
    data-select-box-class="custom-select"
    data-select-list-class="dropdown-menu"
    data-select-item-class="dropdown-item"
    data-tag-class="badge badge-primary"
    data-tag-icon-class="fas fa-times-circle"
>
    <option value="1">First</option>
    <option value="2">Second</option>
    <option value="3">Third</option>
    <option value="4">Fourth</option>
</select>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)