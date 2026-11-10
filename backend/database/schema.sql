USE ledgerline_db;

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'ADMIN',
        'ACCOUNT_HOLDER',
        'AUDITOR'
    ) NOT NULL DEFAULT 'ACCOUNT_HOLDER',

    status ENUM(
        'ACTIVE',
        'BLOCKED'
    ) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE accounts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(30) NOT NULL UNIQUE,

    user_id BIGINT UNSIGNED NULL,

    account_type ENUM(
        'CUSTOMER',
        'SYSTEM'
    ) NOT NULL DEFAULT 'CUSTOMER',

    balance_paise BIGINT UNSIGNED NOT NULL DEFAULT 0,

    status ENUM(
        'ACTIVE',
        'FROZEN',
        'CLOSED'
    ) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_account_owner
        CHECK (
            (account_type = 'CUSTOMER' AND user_id IS NOT NULL)
            OR
            (account_type = 'SYSTEM' AND user_id IS NULL)
        )
) ENGINE=InnoDB;


CREATE TABLE transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    reference_id CHAR(36) NOT NULL UNIQUE,

    transaction_type ENUM(
        'DEPOSIT',
        'WITHDRAWAL',
        'TRANSFER'
    ) NOT NULL,

    status ENUM(
        'PENDING',
        'SUCCESS',
        'REFUSED'
    ) NOT NULL,

    from_account_id BIGINT UNSIGNED NULL,
    to_account_id BIGINT UNSIGNED NULL,

    amount_paise BIGINT UNSIGNED NOT NULL,

    initiated_by BIGINT UNSIGNED NOT NULL,

    failure_reason VARCHAR(255) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_transaction_amount
        CHECK (amount_paise > 0),

    FOREIGN KEY (from_account_id)
        REFERENCES accounts(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (to_account_id)
        REFERENCES accounts(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (initiated_by)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    INDEX idx_transaction_from (from_account_id),
    INDEX idx_transaction_to (to_account_id),
    INDEX idx_transaction_created (created_at)
) ENGINE=InnoDB;

CREATE TABLE ledger_entries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    transaction_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,

    entry_type ENUM(
        'DEBIT',
        'CREDIT'
    ) NOT NULL,

    amount_paise BIGINT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_ledger_amount
        CHECK (amount_paise > 0),

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (account_id)
        REFERENCES accounts(id)
        ON DELETE RESTRICT,

    INDEX idx_ledger_account (account_id),
    INDEX idx_ledger_transaction (transaction_id)
) ENGINE=InnoDB;

CREATE TABLE idempotency_keys (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    idempotency_key VARCHAR(128) NOT NULL,

    request_hash CHAR(64) NOT NULL,

    transaction_id BIGINT UNSIGNED NULL,

    response_json JSON NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_user_idempotency (
        user_id,
        idempotency_key
    ),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    actor_id BIGINT UNSIGNED NULL,

    event_type VARCHAR(100) NOT NULL,

    entity_type VARCHAR(100) NOT NULL,

    entity_id VARCHAR(100) NULL,

    details JSON NULL,

    ip_address VARCHAR(45) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (actor_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    INDEX idx_audit_actor (actor_id),
    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB;