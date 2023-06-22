package com.vpr33.videolibrary.model.comment;

import java.util.Date;

public record PreviewComment(
        Date date, String text, String username
) {
}
