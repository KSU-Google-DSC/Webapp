# Introduction
This webapp mirrors to https://dscksu.club .

Serves as the primary landing site for the **Google Developer Student Club @ Kennesaw State University**. 

# Installation

1. Git clone the repo.
2. cd into ``./src`` under the root directory.
3. ``npm ci`` to install node modules (it's a faster version of ``npm install`` but with less problems with the ``package-lock.json`` file). 
> **Note:** If ``npm ci`` is not available, it's likely that you do not have an npm version greater than or equal to 5.7. To correct this, run ``npm install -g npm`` in your shell.
4. ``npm run dev`` to run in development mode.
> **Warning:** You will never have to run the application in your local environment in production mode. Production mode is used in production deployment.

# Docker

## Running the Dockerfile
> **Assuming:** That Docker is properly installed.
1. cd into the repo. There should be a Dockerfile in the root directory.
2. ``docker build -t gdsc .`` This builds the Dockerfile into an image that you could run.
3. ``docker run --name GDSC -p 3000:3000 gdsc /bin/bash`` This command takes the image that you just built **gdsc** and turns it into a container with the name **GDSC**. It maps port 3000 inside the container to port 3000 outside of the container making for a seamless running experience. Finally **/bin/bash** is the command that we are passing into the container. **/bin/bash** is an executable and conveniently enough it's the shell that we will be using to run our commnads.
> **Note:** You can use the usual things to exit out of the command prompt ``exit`` and `ctrl+d`.

## Inside of the Dockerfile

1. ``cd /Webapp`` 
2. Continue with the steps under **installation**. 
> **Note** May have to run ``npm ci`` twice to get all of the packages that are listed in the **package-lock.json** file.

## Rerunning the Dockerfile

Run ``docker start -i GDSC``.

# Contributions

Master branch is **production**. Development is technically-speaking **release candidate**. If you're developing a feature or fixing a bug, **create a new branch**. When you're finished, **create a pull request** and in that pull request, go into depth about what your code does. Project Managers (& some Seniors) typically lead code reviews. All **pull requests** must be reviewed before entering release candidate or production. 

We **do not** allow outside contributors at this time.

# License

The license is **MIT**. This will be open sourced once we have a stable version. 
