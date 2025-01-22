package com.aidlebanon.AidLebanon.Repository;

import com.aidlebanon.AidLebanon.Entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
	// Custom method to find Follow by UserId and CenterId
	Optional<Follow> findByUser_UserIdAndAidCenter_CenterId(int userId, int centerId);
}
