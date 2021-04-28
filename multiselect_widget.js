/**
 * Multi-select Widget
 *
 * Transforms a form select with the 'multiple' attribute and the
 * 'multiselect-widget' class into a friendly multi-select.
 *
 * @author Leonel Torres <torresleonel18@gmail.com>
 * @license MIT
 * @version 1.0.0
 */
(() => {
    'use strict';

    /**
     * Represents a multi-select widget.
     * @constructor
     * @param {HTMLSelectElement} select - The element to be replaced
     */
    function MultiSelect(select) {
        this.select = select;
        this.noOptionsMessage = select.dataset.noOptionsMsg
            ? select.dataset.noOptionsMsg
            : 'There are no options.';
        this.multiselect = this._buildMultiselect();
    }

    MultiSelect.prototype._buildMultiselect = function () {
        const multiselect = document.createElement('div');
        multiselect.setAttribute('tabindex', 0);
        multiselect.innerHTML = `
            <div class="select-box">
                <div class="tag-box"></div>
            </div>
        `;
        multiselect.append(this._buildOptionList());

        return  multiselect;
    };

    MultiSelect.prototype._buildOptionList = function () {
        const list = document.createElement('div');
        list.classList.add('options-box');

        for (let i = 0; i < this.select.length; i++) {
            let option = document.createElement('a');
            option.dataset.index = i;
            option.append(this.select[i].textContent);
            option.classList.add('option-item');
            list.append(option);
        }
        
        return list;
    };

    MultiSelect.prototype._setMultiselectContainerStyle = function() {
        const classes = this.select.dataset.selectContainerClass;

        if (classes) {
            this.multiselect.classList.add(...classes.split(' '));
        } else {
            Object.assign(this.multiselect.style, {
                position: 'relative',
                display: 'inline-block',
                width: '100%'
            });
        }
    };

    MultiSelect.prototype._setSelectBoxStyle = function() {
        const selectBox = this.multiselect.querySelector('.select-box');
        const classes = this.select.dataset.selectBoxClass;

        if (classes) {
            selectBox.classList.add(...classes.split(' '));
        } else {
            Object.assign(selectBox.style, {
                display: 'inline-block',
                width: '100%',
                minHeight: 'calc(1.5em + .75rem + 2px)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#495057',
                verticalAlign: 'middle',
                background: '#fff right .75rem center/8px 10px no-repeat',
                border: '1px solid #ced4da',
                borderRadius: '.25rem',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
            });
        }
    };

    MultiSelect.prototype._setOptionItemStyle = function() {
        const classes = this.select.dataset.selectItemClass;

        this.multiselect.querySelectorAll('.option-item')
            .forEach(option => {
                if (classes) {
                    option.classList.add(...classes.split(' '));
                } else {
                    Object.assign(option.style, {
                        position: 'relative',
                        padding: '.75rem 1.25rem',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        color: '#333',
                        textDecoration: 'none',
                        display: 'block'
                    });
                }
            });
    };

    MultiSelect.prototype._setNoOptionMessageStyle = function(element) {
        Object.assign(element.style, {
            position: 'relative',
            padding: '.75rem 1.25rem',
            backgroundColor: '#fff',
            color: '#333',
            textDecoration: 'none',
            display: 'block'
        });
    };

    MultiSelect.prototype._setListStyle = function() {
        const list = this.multiselect.querySelector('.options-box');
        const classes = this.select.dataset.selectListClass;

        if (classes) {
            list.classList.add(...classes.split(' '));
        } else {
            Object.assign(list.style, {
                display: 'none',
                position: 'absolute',
                backgroundColor: '#fff',
                width: '100%',
                boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.2)',
                maxHeight: '200px',
                overflow: 'auto',
                zIndex: 1
            });
        }
    };

    MultiSelect.prototype._setTagStyle = function(tag) {
        const classes = this.select.dataset.tagClass;

        if (classes) {
            tag.classList.add(...classes.split(' '));
        } else {
            Object.assign(tag.style, {
                display: 'inline-block',
                cursor: 'default',
                padding: '.25em .8em',
                fontSize: '80%',
                fontWeight: '700',
                lineHeight: '1',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                verticalAlign: 'baseline',
                borderRadius: '.25rem',
                color: '#fff',
                backgroundColor: '#343a40',
                marginLeft: '.2em',
                marginRight: '.2em'
            });
        }
    };

    MultiSelect.prototype._setTagButtonStyle = function(button) {
        const classes = this.select.dataset.tagIconClass;

        if (classes) {
            button.classList.add(...classes.split(' '));
        } else {
            Object.assign(button.style, {
                verticalAlign: 'text-top',
                marginLeft: '.7em',
                fontSize: '10.3px',
                cursor: 'pointer'
            });
            button.textContent = 'x';
        }
    };

    MultiSelect.prototype._setDefaultSelectedOptions = function () {
        const options = this.multiselect.querySelectorAll('.option-item');
        for (let i = 0; i < this.select.length; i++) {
            if (this.select[i].selected)
                this._addOptions(options[i]);
        }
    };

    MultiSelect.prototype._checkAvailableOptions = function () {
        if (this.select.length === this.select.selectedOptions.length) {
            const list = this.multiselect.querySelector('.options-box');
            const optionMessage = document.createElement('a');
            optionMessage.textContent = this.noOptionsMessage;
            optionMessage.classList.add('no-option');
            list.append(optionMessage);
            this._setNoOptionMessageStyle(optionMessage);
        } else {
            const optionMessage = this.multiselect.querySelector('.no-option');
            if (optionMessage)
                optionMessage.remove();
        }
    };

    MultiSelect.prototype._addOptions = function (option) {
        let optionBox = this.multiselect.querySelector('.tag-box');
        let optionTag = document.createElement('div');
        let textTag = document.createElement('span');
        let buttonTag = document.createElement('span');

        buttonTag.classList.add('button-tag');
        textTag.textContent = option.textContent;
        optionTag.dataset.index = option.dataset.index;
        optionTag.classList.add('option-tag');
        optionTag.append(textTag, buttonTag);
        optionBox.append(optionTag);

        option.style.display = 'none';
        this._setTagStyle(optionTag);
        this._setTagButtonStyle(buttonTag);

        this.select[eval(option.dataset.index)].selected = true;
    };

    MultiSelect.prototype._removeOptions = function (option) {
        this.select[eval(option.dataset.index)].selected = false;
        this.multiselect
            .querySelectorAll('.option-item')[eval(option.dataset.index)]
            .style.display = 'block';
        option.remove();
    };

    MultiSelect.prototype._toggleList = function (action = null) {
        const optionBox = this.multiselect.querySelector('.options-box');
        const display = optionBox.style.display;

        if (action === 'show') {
            if (display == 'none')
                optionBox.style.display = 'block';
        } else if (action === 'hidden') {
            if (display != 'none')
                optionBox.style.display = 'none';
        } else {
            optionBox.style.display = display == 'none' ? 'block' : 'none';
        }
    };

    MultiSelect.prototype._delegateEvents = function () {
        this.multiselect.addEventListener('click', e => {
            const classes = e.target.classList;

            if (classes.contains('option-item')) {
                this._addOptions(e.target);
                this._checkAvailableOptions();
            } else if (classes.contains('button-tag')) {
                this._removeOptions(e.target.parentElement);
                this._checkAvailableOptions();
                this._toggleList('show');
            } else if (!classes.contains('no-option')) {
                this._toggleList();
            }
        });

        this.multiselect.addEventListener('blur', () => {
            this._toggleList('hidden');
        });
    };

    MultiSelect.prototype.render = function () {
        this._setMultiselectContainerStyle();
        this._setSelectBoxStyle();
        this._setOptionItemStyle();
        this._setListStyle();
        this._setDefaultSelectedOptions();
        this._checkAvailableOptions();
        this._delegateEvents();

        this.select.hidden = true;
        this.select.insertAdjacentElement('afterend', this.multiselect);
    };

    document.querySelectorAll('select.multiselect-widget[multiple]')
        .forEach(select => {
            new MultiSelect(select).render();
        });
})();
