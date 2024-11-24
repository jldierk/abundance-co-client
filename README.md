# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Prerequisites:
 - npm installed
 - vite installed

To Start this project run "npm run dev" from the root directory
"npm run deploy" to deploy to github pages

For deploying, I had to update the git url to point to my personall access token like this:
git remote set-url origin https://{{TOKEN}}@github.com/jldierk/abundance-co-client.git

Then when running npm deploy it still prompted me for a password, I put the token in again and it seemed to work