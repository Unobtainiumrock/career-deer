# Tasks

1. **Resolve the compilation warnings for the font-end code.**

    ```
    [1] Compiled with warnings.
    [1] 
    [1] ./src/containers/SignUp/actions.js
    [1]   Line 1:   'googleSignUp' is defined but never used      no-unused-vars
    [1]   Line 52:  'createdUser' was used before it was defined  no-use-before-define
    [1] 
    [1] ./src/containers/Board/data-mapper.js
    [1]   Line 16:  Unnecessarily computed property ['on-site'] found  no-useless-computed-key
    [1] 
    [1] ./src/components/ProgressTile/ProgressTile.js
    [1]   Line 1:  'Component' is defined but never used  no-unused-vars
    [1]   Line 3:  'Col' is defined but never used        no-unused-vars
    [1] 
    [1] ./src/components/ProgressTile/JobTile.js
    [1]   Line 10:  'selectUpdateJob' is defined but never used  no-unused-vars
    [1] 
    ```

2. **Track down the deprecation warning for http_parser on backend**

    ```
    [1] (node:646665) [DEP0111] DeprecationWarning: Access to process.binding('http_parser') is deprecated.
    [1] (Use `node --trace-deprecation ...` to show where the warning was created)
    ```

Adding the --trace-deprecation flag didn't work. It's most likely due to a plethora of outdated or mismatched packages.

3. **Convert Over From Traditional Redux to more modern Redux Toolkit (RTK)**

    A lot has changed since 2018 w.r.t. Redux. Lots of boilerplate can be eliminated simply by switching over to more modern Redux. I think
    it's best to first become more familiar with the old code architecture prior to this though.

4. **Draft up and document user stories and application flow**

    There is a lot of room to improve the application in terms of how users interact with it. Some drafting would be useful/

5. **Break Apart the Front End and Back End API's and make the application less monolithic**

6. **Set up a CI/CD Pipeline with Docker**

7. **Deploy to AWS & link up to the registered domain**
    The website will eventually be deployed to some place other than Heroku. The base url in authController.js will need to be changed.

8. **Inject the platform with lots of newly acquired data science and machine learning skills**

9. **Consider convertion to a relational database over mongodb**

10. **Find fresh sources of data to inject into the platform**

11. **Resolve Node Modules Warnings**
    ```
    warning bcrypt-nodejs@0.0.3: bcrypt-nodejs is no longer actively maintained. Please use bcrypt or bcryptjs. See https://github.com/kelektiv/node.bcrypt.js/wiki/bcrypt-vs-brypt.js to learn more about these two options
    warning if-env > npm-run-all > babel-polyfill > core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.
    warning if-env > npm-run-all > babel-polyfill > babel-runtime > core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.
    warning mongoose > @types/mongodb > @types/bson@4.2.0: This is a stub types definition. bson provides its own type definitions, so you do not need this installed.
    warning nodemon > chokidar@2.1.8: Chokidar 2 does not receive security updates since 2019. Upgrade to chokidar 3 with 15x fewer dependencies
    warning nodemon > chokidar > fsevents@1.2.13: The v1 package contains DANGEROUS / INSECURE binaries. Upgrade to safe fsevents v2
    warning nodemon > chokidar > braces > snapdragon > source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
    warning nodemon > chokidar > braces > snapdragon > source-map-resolve > resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
    warning nodemon > chokidar > braces > snapdragon > source-map-resolve > source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
    warning nodemon > chokidar > braces > snapdragon > source-map-resolve > urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
    ```

12. **Add Error Handling to auth controller**

    The authentication process for logging in needs to handle edge cases.

13. **Check How long Password reset links last for**

    Self explanatory.

14. **Update base url for handling user password reset & updates**

15. **Revisit the import copy line in Board.js**

16. **Remove All commented out code**

    Remove most, but not stuff related to functions like signup & login with various social media platforms or Google.

17. **Revisit Implementation of Login using other methods**

    The social media things need to be implemented for user authentication flow.


# For Me

I need to incorproate my following sentiment somewhere into why I am reviving Career Deer:

Lastly, what differentiated this from other platforms was the combination of aggregating job data and tracking them in a Trello board, all in one. Since that time, others have used our idea and monetized it. My main mission is not only to make Career Deer phenomenally better than other options but also free, as a big 'fuck you' to all the greedy people who only ever cared about making money and selling users' data for profit.