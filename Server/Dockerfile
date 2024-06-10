FROM amazoncorretto:17

COPY ./Server/husksheets ./backend

COPY ./Server/husksheets/build/libs/husksheets-0.0.1-SNAPSHOT.jar ./backend/app.jar

WORKDIR ./backend

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]