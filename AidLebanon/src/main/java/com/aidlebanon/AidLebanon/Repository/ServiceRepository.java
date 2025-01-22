package com.aidlebanon.AidLebanon.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.aidlebanon.AidLebanon.Entity.Service;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
}
