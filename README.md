# ev3-code-injection

Having fun with [Lego Mindstorms](http://www.lego.com/en-us/mindstorms), 
[Java EE](http://www.oracle.com/technetwork/java/javaee/overview/index.html) and [Angular](https://angularjs.org/). 

The project shows how to connect the three components. It also enables JavaScript code injection at runtime. 
User can write ev3 program directly in web browser and push it to the brick. Using 
[Nashorn](http://www.oracle.com/technetwork/articles/java/jf14-nashorn-2126515.html) JavaScript engine the brick will 
dynamically execute the written script. 

## Setting up ev3-javaee project

Java EE project is maven based and can be deployed to the Java EE application server. It was tested with Wildfly,
however it should work with any other Java EE compliant application server. 

## Setting up ev3-angular project

Angular project is node.js based. Please refer to the ev3-angular/README.md file for detailed instructions. 

## Setting up ev3-brick project

Brick project is maven based. Lejos libraries are not deployed to the central maven repo and they need to be added 
manually.

 - Download the Lejos library from official page http://www.lejos.org/ev3.php
 - Version used in this project is 0.9.0-beta. 
 - Add it to local maven repository 

 ```
  mvn install:install-file -Dfile=<path-to-ev3classes.jar> -DgroupId=lejos -DartifactId=ev3classes -Dversion=0.9.0-beta -Dpackaging=jar
 ```

 ```
  mvn install:install-file -Dfile=<path-to-dbusjava.jar> -DgroupId=org.freedesktop.dbus -DartifactId=dbus-java -Dversion=2.7 -Dpackaging=jar
 ```

 - Build the project

 ```
  mvn clean install
  ```

 - Run the server
  -- Brick server can be started on local machine 
 
 ```
  java -jar ev3-brick.jar
 ```

  -- Upload the ev3-brick.jar to the device sample folder and it can be executed through the Lejos menu.

