# About

- Project made in `React` using [SNCF API](https://numerique.sncf.com/startup/api/)
- Create a `.env` file at the root of the project and put this within :

    ```sh
    # Do not remove REACT_APP prefix because it allows your keys to be accessible for React
    # API key provided
    REACT_APP_API_KEY=Your key here
    # default url but you can change it as you wish
    REACT_APP_BASE_URL=https://api.sncf.com/v1/coverage/sncf/stop_areas/ 
    ```

- Don't forget to install modules with `npm i`
- Then launch with `npm start`