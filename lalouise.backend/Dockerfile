FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

COPY build/libs/*.jar app.jar
COPY src/main/resources/env.properties env.properties
COPY src/main/resources/application.properties application.properties

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", \
  "--spring.config.location=classpath:/,file:/app/application.properties"]