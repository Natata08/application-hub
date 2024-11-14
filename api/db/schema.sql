CREATE TABLE "user" (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "company" (
    company_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL,
    website VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "company_contact" (
    contact_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    company_id INT NOT NULL REFERENCES "company" (company_id) ON DELETE CASCADE,
    application_id INT NOT NULL REFERENCES "application" (application_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(100),
    email VARCHAR(255),
    ROLE VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE application_status AS ENUM(
    'saved',
    'applied',
    'interview',
    'offer',
    'rejected',
    'withdrawn'
);

CREATE TABLE "application" (
    application_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES "user" (user_id) ON DELETE CASCADE,
    company_id INT NOT NULL REFERENCES "company" (company_id) ON DELETE NO ACTION,
    status application_status NOT NULL,
    is_active BOOLEAN GENERATED ALWAYS AS (
        status IN (
            'saved',
            'applied',
            'interview',
            'offer'
        )
    ) STORED,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    job_link VARCHAR(255),
    salary INT CHECK (salary >= 0),
    applied_date DATE,
    deadline_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "application_note" (
    note_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    application_id INT NOT NULL REFERENCES "application" (application_id) ON DELETE CASCADE,
    CONTENT TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE document_type AS ENUM(
    'resume',
    'cover_letter',
    'other'
);

CREATE TABLE "document" (
    document_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES "user" (user_id) ON DELETE CASCADE,
    application_id INT NOT NULL REFERENCES "application" (application_id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "interview" (
    interview_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    application_id INT NOT NULL REFERENCES "application" (application_id) ON DELETE CASCADE,
    type VARCHAR(100),
    scheduled_at TIMESTAMP NOT NULL,
    location VARCHAR(255), -- can be link for online call or address
    is_virtual BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "notification" (
    notification_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES "user" (user_id) ON DELETE CASCADE,
    application_id INT NOT NULL REFERENCES "application" (application_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_timestamp BEFORE
UPDATE ON "user" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE TRIGGER update_company_timestamp BEFORE
UPDATE ON "company" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE TRIGGER update_company_contact_timestamp BEFORE
UPDATE ON "company_contact" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE TRIGGER update_application_timestamp BEFORE
UPDATE ON "application" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE TRIGGER update_document_timestamp BEFORE
UPDATE ON "document" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE TRIGGER update_notification_timestamp BEFORE
UPDATE ON "notification" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE TRIGGER update_application_note_timestamp BEFORE
UPDATE ON "application_note" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE TRIGGER update_interview_timestamp BEFORE
UPDATE ON "interview" FOR EACH ROW
EXECUTE FUNCTION update_timestamp ();

CREATE INDEX idx_user_email ON "user" (email);

CREATE INDEX idx_application_user_id ON "application" (user_id);