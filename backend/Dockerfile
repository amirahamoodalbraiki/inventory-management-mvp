# Use Java 17 runtime
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy JAR file
COPY target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run JAR with production profile
ENTRYPOINT ["java","-jar","app.jar","--spring.profiles.active=production"]
