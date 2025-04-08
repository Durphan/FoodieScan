package com.menuproject.menuproject.mock.service;

import com.menuproject.menuproject.models.QrCode;
import com.menuproject.menuproject.repository.QrCodeRepository;
import com.menuproject.menuproject.service.qrcode.QrCodeServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QrCodeServiceImplTest {

    @Mock
    private QrCodeRepository qrCodeRepository;

    @InjectMocks
    private QrCodeServiceImpl qrCodeServiceImpl;

    @Test
    void QrSaveTest(){
        //damos datos
        String url = "Este es un link";

        //simulamos metodo
        this.qrCodeServiceImpl.saveQr(url);

        //verificamos
        ArgumentCaptor<QrCode> qrCodeArgumentCaptor = ArgumentCaptor.forClass(QrCode.class);
        verify(this.qrCodeRepository).save((qrCodeArgumentCaptor.capture()));

        QrCode CaptureQrCode = qrCodeArgumentCaptor.getValue();

        assertEquals("Este es un link", CaptureQrCode.getUrl());
    }


    @Test
    void QrFindByUlrTest() throws Exception {
        String url = "Este es un link";
        QrCode qrCode = new QrCode(1L, url);

        when(qrCodeRepository.findByUrl(url)).thenReturn(qrCode);

        // Act: Llamamos al metodo
        byte[] result = qrCodeServiceImpl.findByUrlMenu(url);

        // Assert: Verificamos la captura del argumento
        assertNotNull(result);
        assertTrue(result.length > 0);

    }

}
