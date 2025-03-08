package com.menuproject.menuproject.service.business;

import com.menuproject.menuproject.dto.request.business.BusinessRequestDto;
import com.menuproject.menuproject.models.Business;
import com.menuproject.menuproject.models.User;
import com.menuproject.menuproject.repository.BusinessRepository;
import com.menuproject.menuproject.service.user.UserServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessServiceImpl implements IBusinessService {

    private final BusinessRepository businessRepository;
    private final UserServiceImpl userService;

    public BusinessServiceImpl(BusinessRepository businessRepository, UserServiceImpl userService) {
        this.businessRepository = businessRepository;
        this.userService = userService;
    }

    @Override
    public void save(BusinessRequestDto businessRequestDto) {
        // verificamos si el usuario logueado existe
        User user = userService.getAuthenticatedUserId();

        // creamos busines
        Business business = new Business();
        business.setName(businessRequestDto.name());
        business.setIdUser(user);
        business.setEmail(businessRequestDto.email());
        business.setPhoneNumber((businessRequestDto.phoneNumber()));

        businessRepository.save(business);
    }

    @Override
    public List<Business> findAll() {
        return List.of();
    }

    @Override
    public Business findById(Long idBusiness) {
        return businessRepository.findById(idBusiness)
                .orElseThrow(() -> new RuntimeException("No se encontro el negocio ID:" + idBusiness));
    }

    @Override
    public void upDateUser() {

    }

    @Override
    public void deleteUser() {

    }

    public List<Business> findAllByUserId(Long idUser) {
        List<Business> businesses = businessRepository.findAllByIdUser_idUser(idUser);
        if (!businesses.isEmpty()) {
            return businesses;
        }
        throw new ArrayIndexOutOfBoundsException("Usted no tiene negocios.");
    }

    public void deleteBusinessById(Long idBusiness) {

    }
}
