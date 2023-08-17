# E-Commerce

# Install StackExchange.Redis 
It is used to store basket/shoppingCart on client side. It is fast as it stores data in memory itself and takes screenshot of data frequently like every 1-2 mins.
We have set an expiration time of 30 days for basket.

We can install it from nuget package manager (ctrl + shift + p) in vs code or from nuget pakage manager from visual studio. 

Commands -
# redis-cli
ping -> PONG (To check if redis is installed successfully)

# redis-server
To start the redis server.

# redis-commander
We have to run it inside solution folder here D:\Projects\e-commerce>redis-commander.
It will open redis on port 8081.