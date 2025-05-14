FROM maven:3.9.6-eclipse-temurin-17-alpine AS BUILD
WORKDIR /app
COPY . /app/
RUN mvn clean package -DskipTests
ARG JAR_FILE=target/menuproject-app.jar
COPY ${JAR_FILE} menuproject-app.jar
FROM openjdk:17-oracle AS RUN
EXPOSE 9091
COPY --from=BUILD /app/menuproject-app.jar /menuproject-app.jar
ENTRYPOINT ["java","-jar","/menuproject-app.jar"]