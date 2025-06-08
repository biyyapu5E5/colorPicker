Redux - npm install @reduxjs/toolkit react-redux

## Type Assertion
### What It Does
You're telling TypeScript:

"Trust me, I know that e.target is an HTMLElement."

So you can safely access HTMLElement properties like .style, .tagName, .classList, etc., without a type error.

## Event Delegation

Adding Event on parent element instead of adding it to every child element.

### Why Use Event Delegation?
#### Performance: 
Fewer event listeners = better performance, especially with many child elements.

#### Scalability: 
Easier to manage dynamically added elements.

#### Cleaner code: 
Less repetitive code.

- tabIndex={0} is a small but powerful HTML attribute — especially important for accessibility and keyboard navigation.

##### What does tabIndex={0} mean?
It makes an element focusable via keyboard (or touch on mobile).

In plain English: It lets users tab to the element or focus it (which is useful for things like :focus, peer-focus, etc.).

##### Why Do You Need It?
```tsx
Some elements — like <button>, <input>, <a> — are naturally focusable.

But others — like <div>, <p>, <span> — are not focusable by default.

So if you want to use focus or peer-focus on a <p> or <div>, you must explicitly make it focusable with: tabIndex = {0}
```

```tsx
<p className="peer cursor-pointer" tabIndex={0}>
  Click or focus me
</p>
<div className="invisible peer-hover:visible peer-focus:visible">
  Tooltip or info
</div>

```

```tsx
- On desktop: hovering the <p> shows the tooltip.

- On mobile or keyboard: tapping or focusing the <p> triggers peer-focus and shows the same tooltip.
```

###### Other Values for tabIndex

| `tabIndex` Value | Behavior                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| `0`              | Focusable in the **natural tab order**                                  |
| `-1`             | Focusable **only via JavaScript**, not by tab key                       |
| `>0`             | Focusable in a **custom tab order** (not recommended for accessibility) |
