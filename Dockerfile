FROM  node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -f

# Build the server
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3006

#install curl, so we can run the healthcheck
RUN apk --no-cache add curl

# Run the application.
CMD ["npm",  "run", "start"]
