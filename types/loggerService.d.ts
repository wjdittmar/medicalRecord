declare module '../back/src/services/loggerService' {
	interface LoggerService {
		logError: (message: string, error: unknown) => void;
		logInfo: (message: string, data: unknown) => void;
	}

	const loggerService: LoggerService;
	export default loggerService;
}
