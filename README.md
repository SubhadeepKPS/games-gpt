# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# --------------------------------------------------------

## 1.

- Built a food ordering web app using live Swiggy api.
- Integrated the data layer with the UI layer with central state management using Redux.
- Implemented dynamic routing using react-router and restaurant-ID so that the user can add multiple items to the cart from multiple restaurants at a time.
- Built a custom hook using the browser Geolocation API to render dynamic data according to the user's location by configuring the latitude and longitude query in the Swiggy's API url.
- Built a custom hook using Navigator API to update the user's online or offline status.
- Used resuable components to render restaurant cards and cart items.

## 2.

- Built a web app for the very early-age game enthusiasts that displays Free To Play browser and PC games to make their hands dirty with for free.
- Built config-driven UI where the config-layer is seamlessly integrated with the UI-layer by local and global state-mangement using useState hook and Redux.
- Implemented complex filtering and sorting functionality for multiple parameters.
- Increased the performance by 20% by restricting the API call if the central Redux store has data already in it.
- Made the app multilingual for 3 local languages.
- Fine-tuned the gpt-3.5-turbo model by OpenAI and used the API to fetch 5 games according to the personal query of a user and curate some extra data about the games.
- Increased the performance by 60% against rapid spam clicks for the OpenAI API by using lodash-debounce.
- Restricted the OpenAI API call to 4 requests per minute to control the unncessary API bill hike leveraging the app performance by 5% more.
