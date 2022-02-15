## Global State

Here's a breakdown of the hierarchy we'll be working with

```
index
└── App
    ├── WebsiteLayout
    │   ├── WebsiteHeader
    │   │   └── AuthenticatedDropdownMenu
    │   └── Login
    └── AppLayout
        └── AuthenticatedDropdownMenu
```

1. Refactor from prop-drilling to simple context at `App`

- Both `WebsiteLayout` and `AppLayout` trees

2. Show React Router's "Link state" feature, starting in `AppLayout`
3. Refactor the App's `AuthContext` to a `AuthProvider` abstraction. Then show the `AuthContext` file that uses reducers.
