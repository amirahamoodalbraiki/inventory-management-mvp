# Use Java 17 runtime
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy JAR from backend/target
COPY backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar","--spring.profiles.active=production"]
