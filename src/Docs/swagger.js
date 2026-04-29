import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Events API",
      version: "1.0.0",
      description: `
🚀 Events Management API

Features:
- Authentication (JWT)
- Events CRUD
- Cart System
- Orders System

Built by Seif Elboghdady 👨‍💻
      `,
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
          },
        },

        Event: {
          type: "object",
          required: ["title", "price"],
          properties: {
            title: { type: "string", example: "Concert" },
            description: { type: "string", example: "Live concert" },
            date: { type: "string", example: "2026-05-01" },
            location: { type: "string", example: "Cairo" },
            price: { type: "number", example: 200 },
          },
        },

        AuthResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            token: { type: "string" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },

    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Events", description: "Events management" },
      { name: "Cart" },
      { name: "Orders" },
    ],
  },

  apis: ["./src/routes/**/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);