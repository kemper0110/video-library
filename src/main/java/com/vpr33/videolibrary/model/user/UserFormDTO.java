package com.vpr33.videolibrary.model.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

public record UserFormDTO(
        @NotEmpty(message = "Username cannot be empty.") @Size(min = 3, message = "Username should be at least 3 symbols in length.") String username,
        @NotEmpty(message = "Password cannot be empty.") @Size(min = 5, message = "Password should be at least 5 symbols in length.") String password) {
}