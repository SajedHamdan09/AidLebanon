package com.aidlebanon.AidLebanon.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aidlebanon.AidLebanon.Entity.RequestedService;

@Repository
public interface RequestedServiceRepository extends JpaRepository<RequestedService, Integer> {
}
