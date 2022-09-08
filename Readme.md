Goals of this project,
Goal 1 - Get a taste of a microservices architecture.
Goal 2 - Build as much as possible from scratch.

Do not use this project as a template for future projects. We will create a better one later.

Whenever we start with a project, we need to come up with an answer to the question, How many services do we need? For small scale projects we can go with one service for each resource in our application. In case of this project, we will be having two services, one for posts and the other one for comments.

Posts service will create a post and list all posts.
Comments service will create a comment and list all comments.

Cross-Origin Resource Sharing (CORS) is a HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

CORS is an issue when you're making a request from a domain or domain with a sub-domain or domain with a port that is different from the domain you're making request to.
