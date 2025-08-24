# --- build stage ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
# download deps first for better caching
RUN mvn -q -B -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -B -DskipTests package

# --- runtime stage ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt/app
COPY --from=build /workspace/target/*.jar app.jar
# ensure images directory exists in the container
RUN mkdir -p /opt/app/images
EXPOSE 8080
ENTRYPOINT ["java","-jar","/opt/app/app.jar"]