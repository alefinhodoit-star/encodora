# AGENTS.md

## Project Context

This is a Next.js web application repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Key Files

- `app/`: Next.js application source (App Router)
- `components/`: UI components
- `lib/`: Application libraries and utilities
- `hooks/`: Custom React hooks
- `types/`: TypeScript type definitions

## Working Notes

- Use `npm run dev` for local development
- Use `npm run build` for production builds
- Use `npm run lint` for linting
- Use `npm run typecheck` for TypeScript type checking
- Run the relevant checks from `package.json` before finishing code changes.

## Project Structure

- **App Router**: `app/` directory with layout.tsx and page.tsx files
- **Components**: Reusable UI components in `components/`
- **Libraries**: Application logic in `lib/`
- **Hooks**: Custom React hooks in `hooks/`
- **Types**: TypeScript definitions in `types/`

## Development Workflow

1. Start with `npm run dev`
2. Make changes to files in `app/`, `components/`, `lib/`, etc.
3. Run `npm run typecheck` to verify TypeScript
4. Run `npm run lint` to check code quality
5. Run `npm run build` for production verification

## Code Quality

- TypeScript with strict mode
- ESLint for code quality
- Tailwind CSS for styling
- React Query for data fetching
- React Hook Form with Zod for forms
- Framer Motion for animations
- Shadcn/ui components for UI patterns

## Performance

- Next.js App Router with Server Components
- Optimized images and fonts
- Code splitting and lazy loading
- Static generation where possible
- Client-side rendering only when necessary

## Security

- Environment variables for configuration
- Input validation and sanitization
- Rate limiting and authentication
- HTTPS enforcement in production
- Content Security Policy headers

## Deployment

- Docker support for containerized deployment
- Environment-specific configurations
- CI/CD pipeline integration
- Automated testing and quality checks

## Local Development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open `http://localhost:3000` in your browser
5. Make changes and see them instantly

## Production Build

1. Run `npm run build` to build the application
2. Run `npm start` to start the production server
3. The application will be available at `http://localhost:3000`

## Testing

- Unit tests for components and utilities
- Integration tests for application flows
- E2E tests for user interactions
- Performance testing for critical paths

## Monitoring

- Error tracking and logging
- Performance monitoring
- User analytics
- Health checks and uptime monitoring

## Support

- Documentation in `README.md`
- Code comments and JSDoc
- TypeScript type definitions
- Component documentation

## Future Improvements

- Add more comprehensive testing
- Implement additional monitoring
- Add more UI components
- Improve accessibility
- Add internationalization support
- Add more advanced features

## Project Guidelines

- Keep changes focused and minimal
- Follow existing code patterns
- Write clean, maintainable code
- Add TypeScript types where needed
- Use descriptive variable and function names
- Follow the project's coding style
- Run all checks before committing
- Write tests for new functionality
- Document complex logic
- Keep the codebase organized
- Use version control effectively
- Collaborate effectively with team members
- Stay up-to-date with best practices
- Continuously improve the codebase

## Project Philosophy

This project is built with the following principles:

1. **Simplicity**: Keep things simple and focused
2. **Performance**: Optimize for speed and efficiency
3. **Maintainability**: Write code that's easy to understand and modify
4. **Testability**: Write code that's easy to test
5. **User Experience**: Prioritize user needs and accessibility
6. **Security**: Build secure applications by default
7. **Scalability**: Design for growth and change
8. **Collaboration**: Make it easy for teams to work together

## Project Success Metrics

- Code quality (linting, type checking)
- Performance (load times, bundle size)
- User experience (accessibility, usability)
- Maintainability (code organization, documentation)
- Security (vulnerabilities, best practices)
- Test coverage
- Deployment reliability
- User satisfaction

## Project Roadmap

1. **Phase 1**: Core application structure and basic functionality
2. **Phase 2**: Advanced features and optimizations
3. **Phase 3**: Performance improvements and scaling
4. **Phase 4**: Advanced features and integrations
5. **Phase 5**: Production readiness and monitoring

## Project Team

- **Developers**: Frontend, backend, full-stack
- **Designers**: UI/UX, visual design
- **DevOps**: Infrastructure, deployment, monitoring
- **QA**: Testing, quality assurance
- **Product**: Requirements, features, roadmap

## Project Communication

- **Code reviews**: All changes require review
- **Pull requests**: Use feature branches
- **Documentation**: Update as needed
- **Meetings**: Regular standups and retrospectives
- **Tools**: GitHub for version control, Slack for communication

## Project Tools

- **Version Control**: Git
- **Package Manager**: npm
- **Build Tool**: Next.js
- **Code Editor**: VS Code
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Query
- **Forms**: React Hook Form
- **Validation**: Zod
- **Routing**: Next.js App Router
- **Deployment**: Vercel, Netlify, or custom

## Project Best Practices

1. **Code Quality**: Write clean, readable, maintainable code
2. **Testing**: Write comprehensive tests
3. **Documentation**: Document code and processes
4. **Performance**: Optimize for speed and efficiency
5. **Security**: Build secure applications
6. **User Experience**: Prioritize user needs
7. **Collaboration**: Work effectively with team members
8. **Continuous Improvement**: Always look for ways to improve

## Project Success

This project is successful when:

1. **Code Quality**: Clean, maintainable, well-tested code
2. **Performance**: Fast, responsive application
3. **User Experience**: Intuitive, accessible interface
4. **Security**: Secure by default
5. **Scalability**: Can grow and adapt
6. **Maintainability**: Easy to understand and modify
7. **Team Productivity**: Team can work efficiently
8. **User Satisfaction**: Users are happy with the product

## Project Values

- **Quality**: Build things right
- **Simplicity**: Build things simply
- **Speed**: Build things fast
- **User-Centric**: Build for users
- **Security**: Build securely
- **Scalability**: Build for the future
- **Collaboration**: Build together
- **Continuous Improvement**: Always improve

## Project Vision

To build a world-class web application that:

1. **Delivers Value**: Provides real value to users
2. **Performs Well**: Is fast and efficient
3. **Looks Great**: Is beautiful and intuitive
4. **Works Seamlessly**: Is reliable and accessible
5. **Scales Gracefully**: Can grow and adapt
6. **Is Maintainable**: Easy to understand and modify
7. **Is Secure**: Protects user data and privacy
8. **Is Collaborative**: Enables team productivity

## Project Mission

To create exceptional web applications that:

1. **Solve Problems**: Address real user needs
2. **Exceed Expectations**: Delight users
3. **Set Standards**: Raise the bar for quality
4. **Drive Innovation**: Push the boundaries of what's possible
5. **Build Community**: Foster collaboration and growth
6. **Create Impact**: Make a positive difference

## Project Goals

1. **Technical Excellence**: Build with the highest technical standards
2. **User Experience**: Create delightful user experiences
3. **Business Value**: Deliver value to stakeholders
4. **Team Growth**: Help team members grow and succeed
5. **Innovation**: Stay at the cutting edge of technology
6. **Sustainability**: Build for the long term

## Project Principles

1. **User First**: Always put users first
2. **Quality Over Quantity**: Build quality, not just features
3. **Continuous Learning**: Always learn and improve
4. **Collaboration**: Work together effectively
5. **Transparency**: Be open and honest
6. **Accountability**: Take responsibility for your work
7. **Excellence**: Strive for excellence in everything
8. **Innovation**: Always innovate and improve

## Project Success Criteria

1. **Code Quality**: Clean, maintainable, well-tested code
2. **Performance**: Fast, responsive application
3. **User Experience**: Intuitive, accessible interface
4. **Security**: Secure by default
5. **Scalability**: Can grow and adapt
6. **Maintainability**: Easy to understand and modify
7. **Team Productivity**: Team can work efficiently
8. **User Satisfaction**: Users are happy with the product

## Project Future

1. **Technology**: Stay current with technology trends
2. **Features**: Add valuable features
3. **Performance**: Improve performance continuously
4. **User Experience**: Enhance user experience
5. **Security**: Improve security continuously
6. **Scalability**: Improve scalability
7. **Team**: Grow and develop team members
8. **Innovation**: Innovate and improve continuously

## Project Conclusion

This project is about building exceptional web applications that deliver value, perform well, and create positive impact. It's about working together effectively, continuously improving, and always striving for excellence.

The project is successful when it delivers value to users, performs well, is maintainable, and creates positive impact. It's about building something that people love to use and that stands the test of time.

This project is about building the future, one line of code at a time.