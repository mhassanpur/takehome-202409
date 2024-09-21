FROM node:20-bullseye-slim

# Configure pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Set the working directory
WORKDIR /app

# Copy files
COPY . /app

# Install dependencies
RUN pnpm i --frozen-lockfile

# Build the application
RUN pnpm build

# Expose the port
EXPOSE 5173

# Run the application
CMD ["pnpm", "dev"]