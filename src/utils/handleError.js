// =====================================================
// validation error :
// =====================================================
export class ValidationError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'ValidationError';
        this.details = details;
        this.code = details.code || 'VALIDATION_ERROR';
        this.status = 400;
    }
}
// =====================================================
// SERVICE LAYER :
// =====================================================
export class ServiceError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'ServiceError';
        this.details = details;
        this.code = details.code || 'SERVICE_ERROR';
        this.status = 503;
        this.originalError = details.originalError;
    }
}
// =====================================================
// Internal server :
// =====================================================
export class InternalServerError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'InternalServerError';
        this.details = details;
        this.code = details.code || 'INTERNAL_ERROR';
        this.status = 500;
    }
}

// =====================================================
// LOGGER SERVICE
// =====================================================

export class LoggerService {
    constructor(serviceName = 'App', config = {}) {
        this.serviceName = serviceName;
        this.config = {
            level: 'info',
            enableColors: true,
            enableTimestamp: true,
            enableJson: false,
            ...config
        };
        
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };
    }
}