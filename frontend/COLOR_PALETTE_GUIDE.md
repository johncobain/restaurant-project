# Restaurant App Color Palette Usage Guide

This guide explains how to use the custom Material Design color palette in your Angular restaurant application.

## Generated Color System

Your palette is based on the primary color `#845EC2` (purple) and includes:

### Available Color Roles

#### Primary Colors

- `var(--mat-sys-primary)` - Main brand color (#8963c7)
- `var(--mat-sys-on-primary)` - Text/icons on primary
- `var(--mat-sys-primary-container)` - Lighter primary for containers
- `var(--mat-sys-on-primary-container)` - Text on primary containers

#### Secondary Colors

- `var(--mat-sys-secondary)` - Supporting brand color
- `var(--mat-sys-on-secondary)` - Text/icons on secondary
- `var(--mat-sys-secondary-container)` - Lighter secondary for containers
- `var(--mat-sys-on-secondary-container)` - Text on secondary containers

#### Tertiary Colors

- `var(--mat-sys-tertiary)` - Accent color (#b8548c - pink)
- `var(--mat-sys-on-tertiary)` - Text/icons on tertiary
- `var(--mat-sys-tertiary-container)` - Lighter tertiary for containers
- `var(--mat-sys-on-tertiary-container)` - Text on tertiary containers

#### Surface Colors

- `var(--mat-sys-surface)` - Main surface color
- `var(--mat-sys-surface-container)` - Container surfaces
- `var(--mat-sys-surface-container-low)` - Lower elevation surfaces
- `var(--mat-sys-surface-container-high)` - Higher elevation surfaces
- `var(--mat-sys-surface-bright)` - Bright surface variant
- `var(--mat-sys-on-surface)` - Text on surfaces
- `var(--mat-sys-on-surface-variant)` - Secondary text on surfaces

#### Error Colors

- `var(--mat-sys-error)` - Error states
- `var(--mat-sys-on-error)` - Text on error
- `var(--mat-sys-error-container)` - Error containers
- `var(--mat-sys-on-error-container)` - Text on error containers

#### Outline Colors

- `var(--mat-sys-outline)` - Borders and dividers
- `var(--mat-sys-outline-variant)` - Lighter borders

## Usage Examples

### 1. Basic Component Styling

```scss
.my-component {
  background-color: var(--mat-sys-surface-container);
  color: var(--mat-sys-on-surface);
  border: 1px solid var(--mat-sys-outline-variant);
}
```

### 2. Button Styles

```scss
.primary-button {
  background-color: var(--mat-sys-primary);
  color: var(--mat-sys-on-primary);

  &:hover {
    background-color: var(--mat-sys-primary-container);
    color: var(--mat-sys-on-primary-container);
  }
}
```

### 3. Restaurant-Specific Usage

```scss
// Menu item card
.menu-item {
  background-color: var(--mat-sys-surface-container);
  border: 1px solid var(--mat-sys-outline-variant);

  &.featured {
    background-color: var(--mat-sys-tertiary-container);
    border-color: var(--mat-sys-tertiary);
  }
}

// Order status indicators
.order-status {
  &.pending {
    color: var(--mat-sys-primary);
  }
  &.preparing {
    color: var(--mat-sys-tertiary);
  }
  &.ready {
    color: var(--mat-sys-secondary);
  }
}
```

### 4. Using Utility Classes

```html
<div class="bg-primary-container text-on-primary-container">Welcome to our restaurant!</div>

<button class="bg-tertiary text-on-tertiary">Special Offer</button>

<div class="order-status preparing">Order #123 - Preparing</div>
```

### 5. Advanced: Using SCSS Functions

```scss
@use "../theme-colors" as theme;
@use "@angular/material" as mat;

.custom-gradient {
  background: linear-gradient(135deg, mat.get-theme-color(theme.$primary-palette, primary, 50), mat.get-theme-color(theme.$tertiary-palette, tertiary, 60));
}
```

### 6. Creating Transparent Overlays

```scss
.overlay {
  background-color: color-mix(in srgb, var(--mat-sys-primary) 20%, transparent);
}
```

## Best Practices

1. **Use semantic color roles** instead of specific color values
2. **Always pair colors correctly** (e.g., use `on-primary` text with `primary` backgrounds)
3. **Test in both light and dark modes** - the system automatically adapts
4. **Use container variants** for cards and elevated surfaces
5. **Apply outline colors** for borders and dividers
6. **Use error colors** for validation and error states

## Restaurant App Color Recommendations

- **Primary**: Main brand elements, CTAs, navigation
- **Secondary**: Supporting actions, filters, secondary navigation
- **Tertiary**: Special offers, featured items, highlights
- **Surface**: Cards, menus, content areas
- **Error**: Form validation, out-of-stock items, order issues

## Accessibility

All colors in this palette meet WCAG accessibility standards when used with their corresponding "on-" colors. The system automatically provides appropriate contrast ratios for both light and dark themes.
