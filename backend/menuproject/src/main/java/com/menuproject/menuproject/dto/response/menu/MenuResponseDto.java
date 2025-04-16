package com.menuproject.menuproject.dto.response.menu;

public record MenuResponseDto(
                String name,
                Long Business,
                Long id) {
        public MenuResponseDto(String name, Long business) {
                this(name, business, null);
        }

}
