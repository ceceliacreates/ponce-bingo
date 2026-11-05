# Selfie Bingo Game
A networking game hybrid app for mobile built with [Ionic](https://ionicframework.com/) + [Capacitor](https://capacitorjs.com/)! This was built for Out in Tech Atlanta to encourage making connections at events.

Deployed game at: https://selfie-bingo.netlify.app/

## Functionality & Screenshots
1. Main bingo game UI. Clicking a square opens the bingo square UI.
2. Bingo square UI. Tap the blue camera icon to launch the default device camera. Will automatically use front-facing camera if on a mobile device.
3. Camera UI. Leverages [Capacitor Camera API](https://capacitorjs.com/docs/apis/camera) and has access to any built-in camera features (such as reactions on MacOS).
4. Bingo square UI. Photo is saved to the square and user can mark the square as complete.
5. Completed bingo game UI.
6. Game reset UI. Uses [Capacitor Preferences API](https://capacitorjs.com/docs/apis/preferences) to save, load, and reset bingo game progress.
7. Instructions UI.

<img width="200" alt="Screenshot 2024-06-06 at 11 08 27 PM" src="https://github.com/ceceliacreates/selfie-bingo/assets/40367173/be7c3efe-dff8-4a49-b958-9d8e38b7d4e1">
<img width="200" alt="Screenshot 2024-06-06 at 11 08 46 PM" src="https://github.com/ceceliacreates/selfie-bingo/assets/40367173/cdcf3523-3b9e-41b1-9c2c-02d4fdd36a6f">
<img width="200" alt="Screenshot 2024-06-06 at 11 10 06 PM" src="https://github.com/ceceliacreates/selfie-bingo/assets/40367173/63039906-7e62-436f-b936-ae7d7ad742f2">
<img width="200" alt="Screenshot 2024-06-06 at 11 10 43 PM" src="https://github.com/ceceliacreates/selfie-bingo/assets/40367173/486aec9d-de51-4a5c-9bf0-95925c7f7b7c">
<img width="200" alt="Screenshot 2024-06-06 at 11 11 01 PM" src="https://github.com/ceceliacreates/selfie-bingo/assets/40367173/c9038cce-4d00-4757-8227-f342959106d8">
<img width="200" alt="Screenshot 2024-06-06 at 11 11 18 PM" src="https://github.com/ceceliacreates/selfie-bingo/assets/40367173/30be7e0c-1f00-41d4-a46e-cf01d0ba7a7d">
<img width="200" alt="Screenshot 2024-06-06 at 11 11 24 PM" src="https://github.com/ceceliacreates/selfie-bingo/assets/40367173/7d635102-8c89-4e7a-8ca6-e5ef2e6b5778">

## To-Do
- Add more games with a game selection function
- Add share feature to share selfie to social media
- Improve styling for bingo squares on main bingo UI to make prompts more readable
- Update favicon
- Overall style improvements
- Compile for native Android and iOS for deployment to app stores
