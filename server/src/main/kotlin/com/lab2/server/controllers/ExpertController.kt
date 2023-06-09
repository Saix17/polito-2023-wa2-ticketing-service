package com.lab2.server.controllers

import com.lab2.server.dto.ExpertDTO
import com.lab2.server.dto.ExpertiseDTO
import com.lab2.server.exceptionsHandler.exceptions.ExpertNotFoundException
import com.lab2.server.exceptionsHandler.exceptions.ExpertiseNotFoundException
import com.lab2.server.exceptionsHandler.exceptions.NoBodyProvidedException
import com.lab2.server.services.ExpertService
import com.lab2.server.services.ExpertiseService
import io.micrometer.observation.annotation.Observed
import jakarta.transaction.Transactional
import lombok.extern.slf4j.Slf4j
import org.hibernate.query.sqm.tree.SqmNode.log
import org.springframework.http.HttpStatus
import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.*

@RestController
@Slf4j
@Observed
class ExpertController(private val expertService: ExpertService, private val expertiseService: ExpertiseService) {

    @GetMapping("/experts/")
    @ResponseStatus(HttpStatus.OK)
    @Secured("MANAGER")
    fun getAll(): MutableSet<ExpertDTO> {
        log.info("Retrieving all experts")
        return expertService.getAll()
    }

    @GetMapping("/experts/{expertEmail}")
    @ResponseStatus(HttpStatus.OK)
    @Secured("MANAGER")
    fun getById(@PathVariable expertEmail: String): ExpertDTO? {
        log.info("Retrieving expert linked to $expertEmail")
        return expertService.getExpertByEmail(expertEmail) ?: throw ExpertNotFoundException("Expert not found")
    }

    @PostMapping("/experts/")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured("MANAGER")
    fun createExpert(@RequestBody expert: ExpertDTO?){
        if (expert == null) {
            log.error("Invalid body creating expert")
            throw NoBodyProvidedException("You have to add a body")
        }
        log.info("Creating expert ${expert.email}")
        expertService.insertExpert(expert.email, expert.name, expert.surname)
    }

    @PutMapping("/experts/{expertEmail}/addExpertise")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured("MANAGER")
    @Transactional
    fun addExpertise(@PathVariable expertEmail: String, @RequestBody expertise: ExpertiseDTO?) {
        if (expertise === null) {
            log.error("Invalid body adding expertise to expert")
            throw NoBodyProvidedException("No body")
        }
        log.info("Adding expertise ${expertise.field} to expert linked to $expertEmail")
        val exp = expertiseService.getExpertise(expertise.field)
                ?: throw ExpertiseNotFoundException("Expertise not found")
        val expert = expertService.getExpertByEmail(expertEmail)
                ?: throw ExpertNotFoundException("Expert not found")

        expertService.addExpertiseToExpert(expert, exp)
    }
}