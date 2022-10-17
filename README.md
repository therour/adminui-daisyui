# Admin UI with Daisyui

## Packages
- [axios](https://github.com/axios/axios) (a http client)
- [phospor-react](https://github.com/phosphor-icons/phosphor-react) (react component icon from [phosphoricons.com](https://phosphoricons.com/))
- [react-daisyui](https://react.daisyui.com/) (react component of [daisyui](https://daisyui.com/))
- [react-hook-form](https://react-hook-form.com/) (react hook for handling form state)
- [react-query](https://react-query-v3.tanstack.com/) (react fetching library)
- [zod](https://github.com/colinhacks/zod) (typescript validation schema)
- [zustand](https://github.com/pmndrs/zustand) (ez state management)

## Styling
- [Customize daisyUI components — Tailwind CSS Components](https://daisyui.com/docs/customize/)
- For Icon used here read about [phosphoricons.com](https://phosphoricons.com/)


## Structure Folder

### `/public`
All public assets are stored here ([read more about public dir in Create React App](https://create-react-app.dev/docs/using-the-public-folder/))

### `src/api`
All API Call definition are stored here<br/>
for example you want to call login endpoint:
```typescript
import Api from '../api'

Api.auth.login({ email: 'user@example.com', password: 'password' })
    .then((response) => {
        const { data: user, token } = response.data
    })
```

### `src/common`
All object or utils that are globally used in this project can be stored here<br/>
for example:
- `src/common/query-client` to store the created QueryClient instance from `react-query`
- `src/common/TempLocalStorage` a local storage with expiration time instance

### `src/components`
All global reusable component can be stored here

### `src/router`
The routes definition are configured in `src/router/index.tsx` you may add your route here

### `src/services`
Usually for business logic are stored in their own service domain here<br/>
for example:
- `AuthService` in `src/services/auth.service.ts` is the service for:
    - getting current authenticated user data -> this calls `Api.auth.getMe` api
    - login -> this calls `Api.auth.login` api
    - logout -> this calls `Api.auth.logout` api

### `src/store`
for globally state management store

### `src/styles`
you can store all the style css here

### `src/types`
you can store all the reusable typescript type definition here

### `src/views`
for all the views (page / layout)
- usually in `src/router/index` we will point the route element to component defined in this directory