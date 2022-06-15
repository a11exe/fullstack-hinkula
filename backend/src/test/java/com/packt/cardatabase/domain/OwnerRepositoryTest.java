package com.packt.cardatabase.domain;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class OwnerRepositoryTest {

    @Autowired
    private OwnerRepository ownerRepository;

    @Test
    void saveOwner() {
        ownerRepository.save(new Owner("Lucy", "Smith"));
        assertThat(ownerRepository.findByFirstName("Lucy").isPresent()).isTrue();
    }

    @Test
    void deleteOwners() {
        ownerRepository.save(new Owner("Lisa", "Morrison"));
        ownerRepository.deleteAll();
        assertThat(ownerRepository.count()).isZero();
    }

}