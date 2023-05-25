package com.lab2.server.dto

import com.lab2.server.data.Expertise

data class ExpertiseDTO(
    val id: Long?,
    val field: String
)

fun Expertise.toDTO(): ExpertiseDTO {
    return ExpertiseDTO(this.id, this.field)
}
