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

18. **Revisit this**

    ```
    import { selectUpdateJob } from '../../containers/UpdateJob/actions';
    ```
    Its located in Tile.js under components

19. **Silly mistake, but remove the semi-colons on all the jsx code**

    ```
    return (jsx here); <---
    ```

20. **Silly low priority to remove more semicolons**
    JS convention should have NO semicolons on function declarations, but it SHOULD have semicolons on function expressions, where expressions are for functions assigned to variables, whereas function declarations are the ones we can think of that get "hoisted".

21. **Revisit a function that could grab too much data from the DB**
    The actions file for Chart.js should  cause a significant performance bottle neck if the db is large and we grab all DB data from getDBData.

22. **Finish the Google Signup flow**
    The Google signup thunk is unfinished in the actions.js file and the component itself may need that part commented out for now.

23. **Map Dispatch to Props direct invocation**

    Test whether or not the direct invocation of the mapDispatchToProps function will break if invocation is removed.

24. **Apply newlines at the end of each file**
    This will help with POSIX standards, compatability with UNIX/Linux tools, avoid concatenation issues.

25. **Investigate switching over to pnpm**
    Its apparently a blazingly fast package manager and I want to get away from yarn if it somehow helps meta become more dominant.

26. **Clean up Redux State**
    Clean up the Redux state and initial state for error handling. Start with the react forms that were newly added.

27. **Add back in react-router-dom**
    If its compatible with current React, then add it back in. Otherwise, look for a new tool to get similar behavior.

28. **Test all Edge Cases for the various forms**
    Determine if proper error messaging is implemented.

29. **Consider Converting all class components to functional components**
    Determine whether or not the container-functional component paradigm still holds or how it changes if we make every component a function.
    if converted over to functional components that use newer React features, to what extent will Redux play a role in going forward?

30. **Resolve all the warnings upon yarn start:dev**
    Self-explanatory.

```
warning " > chartjs-plugin-datalabels@0.3.0" has incorrect peer dependency "chart.js@>= 2.7.0 < 3".

31. **Running list of imports that need to be updated**
    Many imports from old npm packages need to be updated to more modern versions:
        - react-awesome-reveal: This will replace react-reveal. `import Tada from 'react-reveal/Tada'` and `import Fade from 'react-reveal/Tada'` can be `import { Tada, Fase } from 'react-awesome-reveal'` and then the component usage in the code must be changed.

        - @hello-pangea/dnd: This will replace replace `react-beautifl-dnd`. Instead of `import { DragDropContext } from 'react-beautiful-dnd'`, we can instead do `import { DragDropContext } from '@hello-pangea/dnd'` and need to further test what parts of the application break.

32. **Verify Menu.js isn't needed and remove it**
    self-explanatory


33. **Autocomplete functionality**
    A form field has an id or name attribute that the browser's autofill recognizes. However, it doesn't have an autocomplete attribute assigned. This might prevent the browser from correctly autofilling the form.

    To fix this issue, provide an autocomplete attribute.

    1 resource
    Violating node
    Learn more: HTML attribute: autocomplete.

34. **Consider Integration of Yup Package**
    Rationale: Ensure that the validate function returns errors in the format expected by react-hook-form. Alternatively, use a schema validation library like Yup for better integration with react-hook-form.


35. **Ensure that the application doesn't have unnecessary state management**
    Some parts of the initialState.js can potentially be removed. Additionally, we need to double-check that some of the react components aren't working with excessive slices of the the store when mapping state to props.

36. **Investigate adding rate limiting to certain areas**
    See suggestions.js
```

37. **Revisit Nav Split Rendering**
    The Nav functional component may not need to have this split difference in how Nav elements are shown. Revisit and consider whether or not they are needed.             

38. **Change initialState variables to use a word other than 'status'**
    Should probably change over the name 'status' to 'success' and change error to 'failure', since that's the manner in which each variable on the state is being used.
    Moreover, some of these may be able to be removed entirely if these parts of state don't need to persist --Deep investigate user flows and conditonal rendering.

39. **The implementation of data-mapper.js needs work**
    The implementation is very naive and either outright not needed, or can be significantly improved in terms of performance from a few simple changes to the underlying data structures and algorithm.

40. **Split apart the BurgerMenu into functional and container components**
    self-explanatory

41. **Implement Optimistic Updates on Frontend**
    Essentially, update the UI by reflecting changes immediately, while the backend update is in progress. Some places already have this.

42. **Revisit and Weigh Costs of Preserving Ordering**
    To have order of tile elements within columns persist is expensive. Revisit later to determine if its desired.
# For Me

I need to incorproate my following sentiment somewhere into why I am reviving Career Deer:

Lastly, what differentiated this from other platforms was the combination of aggregating job data and tracking them in a Trello board, all in one. Since that time, others have used our idea and monetized it. My main mission is not only to make Career Deer phenomenally better than other options but also free, as a big 'fuck you' to all the greedy people who only ever cared about making money and selling users' data for profit.
