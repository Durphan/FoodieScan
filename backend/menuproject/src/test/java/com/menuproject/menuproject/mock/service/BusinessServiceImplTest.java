package com.menuproject.menuproject.mock.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.menuproject.menuproject.dto.request.business.BusinessRequestDto;
import com.menuproject.menuproject.models.Business;
import com.menuproject.menuproject.models.User;
import com.menuproject.menuproject.repository.BusinessRepository;
import com.menuproject.menuproject.service.business.BusinessServiceImpl;
import com.menuproject.menuproject.service.user.UserServiceImpl;

@ExtendWith(MockitoExtension.class)
class BusinessServiceImplTest {

    @Mock
    BusinessRepository businessRepository;
    @InjectMocks
    BusinessServiceImpl businessServiceImpl;
    @Mock
    UserServiceImpl userServiceImpl;

    private final Calendar calendar = Calendar.getInstance();
    {
        calendar.set(1996, Calendar.SEPTEMBER, 31);
    }

    private final Date date = calendar.getTime();

    private final User testUser = new User(0L, "testuser@gmail.com", "testpassword", "1234532", date, "testuser");

    private final Business testBusiness = new Business(0L, "testbusiness", "1234532", "testemail@gmail.com", testUser,
            true);

    @Test
    void saveBusinessTest() {
        BusinessRequestDto businessRequestDto = new BusinessRequestDto("business name", "1232312",
                "business@gmail.com");
        businessServiceImpl.save(businessRequestDto);
        ArgumentCaptor<Business> businessCaptor = ArgumentCaptor.forClass(Business.class);
        Mockito.verify(businessRepository).save(businessCaptor.capture());
        Business businessCreated = businessCaptor.getValue();
        assertEquals(businessRequestDto.name(), businessCreated.getName());
    }

    @Test
    void findByIdTest() {
        Mockito.when(userServiceImpl.getAuthenticatedUserId()).thenReturn(testUser);
        Mockito.when(businessRepository.findById(0L)).thenReturn(Optional.of(testBusiness));
        Business foundBusinesss = businessServiceImpl.findById(0L);
        assertEquals(testBusiness.getName(), foundBusinesss.getName());
        assertEquals(testBusiness.getIdUser().getIdUser(), foundBusinesss.getIdUser().getIdUser());
    }

    @Test
    void findAllByUserIdTest() {
        Mockito.when(userServiceImpl.getAuthenticatedUserId()).thenReturn(testUser);
        Mockito.when(businessRepository.findAllByIdUser_idUser(testUser.getIdUser())).thenReturn(List.of(testBusiness));
        List<Business> foundBusiness = businessServiceImpl.findAllByUserId();
        assertEquals(testBusiness.getName(), foundBusiness.get(0).getName());
    }

    @Test
    void updateBusinessTest() {
        Mockito.when(userServiceImpl.getAuthenticatedUserId()).thenReturn(testUser);
        Mockito.when(businessRepository.findById(0L)).thenReturn(Optional.of(testBusiness));
        BusinessRequestDto newBusinessRequestDto = new BusinessRequestDto("new business", "1234532",
                "dsadas@gmail.com");
        businessServiceImpl.updateBusinessById(0L, newBusinessRequestDto);
        ArgumentCaptor<Business> businessCaptor = ArgumentCaptor.forClass(Business.class);
        Mockito.verify(businessRepository).save(businessCaptor.capture());
        Business updatedBusiness = businessCaptor.getValue();
        assertEquals(newBusinessRequestDto.name(), updatedBusiness.getName());
    }

    @Test
    void desactivateBusinessTest() {
        Mockito.when(userServiceImpl.getAuthenticatedUserId()).thenReturn(testUser);
        Mockito.when(businessRepository.findById(0L)).thenReturn(Optional.of(testBusiness));
        businessServiceImpl.desactivateBusinessById(0L);
        ArgumentCaptor<Business> businessCaptor = ArgumentCaptor.forClass(Business.class);
        Mockito.verify(businessRepository).save(businessCaptor.capture());
        Business desactivatedBusiness = businessCaptor.getValue();
        assertEquals(false, desactivatedBusiness.isActive());
    }

}
