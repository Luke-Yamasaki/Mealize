def errors_to_list(validation_errors):
    errors = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errors.append(f'{field} : {error}')
    return errors
