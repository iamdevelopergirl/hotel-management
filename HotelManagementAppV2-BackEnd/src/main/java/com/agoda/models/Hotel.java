package com.agoda.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Hotel {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String address1;
    private String address2;
    private String city;
    private String postalCode;
    private String phoneNumber;
    private String image;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    public Hotel() {
        super();
    }

    public Hotel(int id, String name, String address1, String address2, String city, String postalCode, String phoneNumber, String image, User user) {
        super();
        this.id = id;
        this.name = name;
        this.address1 = address1;
        this.image = image;
        this.user = user;
        this.address2 = address2;
        this.city = city;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
    }

    public Hotel(String name, String address1, String address2, String city, String postalCode, String phoneNumber, String image) {
        super();
        this.id = 1;
        this.name = name;
        this.address1 = address1;
        this.image = image;
        //this.user = user;
        this.address2 = address2;
        this.city = city;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
